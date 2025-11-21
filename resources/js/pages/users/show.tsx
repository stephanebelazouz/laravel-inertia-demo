import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/users';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { BreadcrumbItem, User } from '@/types';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function View({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users list',
            href: index().url,
        },
        {
            title: `${user.firstname} ${user.lastname}`,
            href: show(user.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users create" />
            <div className="p-6">
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="shrink-1 text-xl">
                                Edit user {user.lastname} {user.firstname}
                            </CardTitle>
                            <div className="flex gap-4">
                                <Link href={edit(user.id).url}>
                                    <Button variant="default">
                                        <Pencil />
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={index().url}>
                                    <Button variant="default">
                                        <ArrowLeft />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <p>
                            <strong>Firstname :</strong> {user.firstname}
                            <br />
                            <strong>Lastname :</strong> {user.lastname}
                            <br />
                            <strong>Email :</strong> {user.email}
                            <br />
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
