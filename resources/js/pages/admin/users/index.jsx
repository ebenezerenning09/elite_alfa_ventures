import FormModal from '@/components/admin/FormModal';
import AdminLayout from '@/components/admin/Layout';
import StatusBadge from '@/components/admin/StatusBadge';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { debounce } from 'lodash';
import { Ban, CheckCircle, Edit, Eye, Plus, Search, Trash2, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function UsersIndex({ users, filters }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const filtersRef = useRef(filters);

    // Keep filters ref updated
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        full_name: '',
        phone: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        full_name: '',
        phone: '',
        is_active: true,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.users.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            full_name: user.full_name || '',
            phone: user.phone || '',
            is_active: user.is_active,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('admin.users.update', editingUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingUser(null);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const handleToggleActive = (id) => {
        router.post(
            route('admin.users.toggle-active', id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(
                route('admin.users.index'),
                {
                    ...filtersRef.current,
                    search: query,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 500),
        [],
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleFilter = (key, value) => {
        router.get(
            route('admin.users.index'),
            {
                ...filters,
                [key]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <AdminLayout activeTab="users" title="Users Management">
            <Head title="Users Management" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[var(--color-deep-blue)]">Users</h2>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border-gray-300 pl-10"
                        />
                    </div>
                    <Select value={filters.is_active || 'all'} onValueChange={(value) => handleFilter('is_active', value)}>
                        <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Users Table */}
                {users.data && users.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">#</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Name</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Email</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Phone</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Orders</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Status</th>
                                    <th className="p-3 text-right text-sm font-semibold text-[var(--color-deep-blue)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm text-[var(--color-brown)]">{users.from ? users.from + index : index + 1}</td>
                                        <td className="p-3">
                                            <div className="font-medium text-[var(--color-deep-blue)]">{user.name}</div>
                                            {user.full_name && <div className="text-sm text-[var(--color-brown)]">{user.full_name}</div>}
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)]">{user.email}</td>
                                        <td className="p-3 text-[var(--color-brown)]">{user.phone || 'N/A'}</td>
                                        <td className="p-3 text-[var(--color-brown)]">{user.orders_count || 0}</td>
                                        <td className="p-3">
                                            <StatusBadge status={user.is_active ? 'active' : 'inactive'} />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('admin.users.show', user.id)}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(user)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`h-8 w-8 p-0 ${user.is_active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                                                    onClick={() => handleToggleActive(user.id)}
                                                    title={user.is_active ? 'Block User' : 'Unblock User'}
                                                >
                                                    {user.is_active ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={users.links} lastPage={users.last_page} className="mt-6" />
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <Users className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-xl font-semibold text-[var(--color-deep-blue)]">No users found</h3>
                        <p className="mt-2 text-[var(--color-brown)]">Get started by creating a new user</p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-6 bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </div>
                )}

                {/* Create Modal */}
                <FormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        createForm.reset();
                    }}
                    title="Create User"
                    onSubmit={handleCreate}
                    isSubmitting={createForm.processing}
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-[var(--color-deep-blue)]">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {createForm.errors.name && <p className="mt-1 text-sm text-red-600">{createForm.errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-[var(--color-deep-blue)]">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData('email', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {createForm.errors.email && <p className="mt-1 text-sm text-red-600">{createForm.errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-[var(--color-deep-blue)]">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={createForm.data.password}
                                onChange={(e) => createForm.setData('password', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {createForm.errors.password && <p className="mt-1 text-sm text-red-600">{createForm.errors.password}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="full_name" className="text-[var(--color-deep-blue)]">
                                    Full Name
                                </Label>
                                <Input
                                    id="full_name"
                                    value={createForm.data.full_name}
                                    onChange={(e) => createForm.setData('full_name', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-[var(--color-deep-blue)]">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    value={createForm.data.phone}
                                    onChange={(e) => createForm.setData('phone', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="is_active" className="text-[var(--color-deep-blue)]">
                                Status
                            </Label>
                            <Select
                                value={createForm.data.is_active ? 'active' : 'inactive'}
                                onValueChange={(value) => createForm.setData('is_active', value === 'active')}
                            >
                                <SelectTrigger className="mt-1 border-gray-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </FormModal>

                {/* Edit Modal */}
                <FormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingUser(null);
                        editForm.reset();
                    }}
                    title="Edit User"
                    onSubmit={handleUpdate}
                    isSubmitting={editForm.processing}
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit_name" className="text-[var(--color-deep-blue)]">
                                Name
                            </Label>
                            <Input
                                id="edit_name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {editForm.errors.name && <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="edit_email" className="text-[var(--color-deep-blue)]">
                                Email
                            </Label>
                            <Input
                                id="edit_email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {editForm.errors.email && <p className="mt-1 text-sm text-red-600">{editForm.errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="edit_password" className="text-[var(--color-deep-blue)]">
                                Password (leave blank to keep current)
                            </Label>
                            <Input
                                id="edit_password"
                                type="password"
                                value={editForm.data.password}
                                onChange={(e) => editForm.setData('password', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {editForm.errors.password && <p className="mt-1 text-sm text-red-600">{editForm.errors.password}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_full_name" className="text-[var(--color-deep-blue)]">
                                    Full Name
                                </Label>
                                <Input
                                    id="edit_full_name"
                                    value={editForm.data.full_name}
                                    onChange={(e) => editForm.setData('full_name', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit_phone" className="text-[var(--color-deep-blue)]">
                                    Phone
                                </Label>
                                <Input
                                    id="edit_phone"
                                    value={editForm.data.phone}
                                    onChange={(e) => editForm.setData('phone', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit_is_active" className="text-[var(--color-deep-blue)]">
                                Status
                            </Label>
                            <Select
                                value={editForm.data.is_active ? 'active' : 'inactive'}
                                onValueChange={(value) => editForm.setData('is_active', value === 'active')}
                            >
                                <SelectTrigger className="mt-1 border-gray-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </FormModal>
            </div>
        </AdminLayout>
    );
}
