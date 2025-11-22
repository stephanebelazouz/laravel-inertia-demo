import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/users';
import { Head, router } from '@inertiajs/react';

import { DeleteModalConfirmation } from '@/components/delete-modal-confirmation';
import UserForm from '@/forms/user-form';
import { edit } from '@/routes/appearance';
import { UserCreatePayload, UsersService } from '@/services/users';
import { BreadcrumbItem, User } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users list',
        href: index().url,
    },
    {
        title: 'Edit',
        href: edit().url,
    },
];

export default function Edit({ user }: { user: User }) {
    const handleSubmit = async (data: UserCreatePayload) => {
        try {
            await UsersService.update(user.id, data);
            toast.success('User updated successfully!');
        } catch (err: unknown) {
            console.error('Error creating user:', err);
            const error = err as { response?: { status?: number } };
            if (error.response?.status === 422) {
                toast.error('Validation error. Please check your fields.');
            } else {
                toast.error('An error occurred. Try again later.');
            }
        }
    };

    const handleDelete = async () => {
        try {
            await UsersService.delete(user.id);
            toast.success('User deleted successfully');
            router.visit('/users');
        } catch (err: unknown) {
            console.error('Error deleting user:', err);
            const error = err as {
                response?: { status?: number; data?: { message?: string } };
            };

            toast.error(
                error.response?.data?.message || 'Unable to delete user',
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users create" />
            <div className="p-6">
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">
                                Edit user {user.lastname} {user.firstname}
                            </CardTitle>
                            <div className="flex gap-4">
                                <DeleteModalConfirmation
                                    callback={handleDelete}
                                />
                                <Link href={index().url}>
                                    <Button>
                                        <ArrowLeft />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <UserForm
                            onSubmit={handleSubmit}
                            defaultValues={user}
                            mode="update"
                        />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
