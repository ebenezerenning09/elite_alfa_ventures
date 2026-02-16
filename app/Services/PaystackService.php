<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaystackService
{
    protected string $secretKey;
    protected string $publicKey;
    protected string $baseUrl = 'https://api.paystack.co';

    public function __construct()
    {
        $this->secretKey = config('services.paystack.secret_key', '');
        $this->publicKey = config('services.paystack.public_key', '');
    }

    /**
     * Generate a unique transaction reference
     */
    public function genTranxRef(): string
    {
        return 'PAY-' . strtoupper(uniqid());
    }

    /**
     * Get authorization URL for payment
     */
    public function getAuthorizationUrl(array $data): object
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->secretKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/transaction/initialize', $data);

        if ($response->successful()) {
            $result = $response->json();
            if ($result['status'] === true) {
                return (object) [
                    'url' => $result['data']['authorization_url'],
                ];
            }
        }

        Log::error('Paystack initialization failed', [
            'response' => $response->json(),
            'status' => $response->status(),
        ]);

        throw new \Exception('Failed to initialize Paystack payment');
    }

    /**
     * Verify payment transaction
     */
    public function verifyTransaction(string $reference): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->secretKey,
            'Content-Type' => 'application/json',
        ])->get($this->baseUrl . '/transaction/verify/' . $reference);

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('Paystack verification failed', [
            'reference' => $reference,
            'response' => $response->json(),
            'status' => $response->status(),
        ]);

        throw new \Exception('Failed to verify Paystack transaction');
    }

    /**
     * Get payment data (alias for verifyTransaction for compatibility)
     */
    public function getPaymentData(): array
    {
        $reference = request()->get('reference');
        
        if (!$reference) {
            throw new \Exception('Payment reference not found');
        }

        return $this->verifyTransaction($reference);
    }
}
