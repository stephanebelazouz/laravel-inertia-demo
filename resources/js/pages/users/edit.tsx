import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/users';
import { Head } from '@inertiajs/react';

import UserForm from '@/forms/user-form';
import { UserCreatePayload, UsersService } from '@/services/users';
import { BreadcrumbItem, User } from '@/types';
import { Link } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users list',
        href: index().url,
    },
    {
        title: 'Create',
        href: create().url,
    },
];

export default function Edit({ user }: { user: User }) {
    const handleSubmit = async (data: UserCreatePayload) => {
        try {
            await UsersService.update(user.id, data);
            toast.success('User updated successfully!');
        } catch (err: unknown) {
            console.error('Error creating user:', err);
            if (err.response?.status === 422) {
                toast.error('Validation error. Please check your fields.');
            } else {
                toast.error('An error occurred. Try again later.');
            }
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
                            <Link href={index().url}>
                                <Button>Back</Button>
                            </Link>
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
