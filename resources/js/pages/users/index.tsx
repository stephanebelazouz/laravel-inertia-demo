import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/users';
import { BreadcrumbItem, PageProps, Paginated, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users list',
        href: index().url,
    },
];

export default function Index() {
    const { users } = usePage<PageProps<{ users: Paginated<User> }>>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users list" />
            <div className="p-6">
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">
                                Registred users
                            </CardTitle>
                            <Link href={create().url}>
                                <Button>Add user</Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Firstname</TableHead>
                                    <TableHead>Lastname</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">
                                        Created at
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Updated at
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.data.map((user: User) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.firstname}</TableCell>
                                        <TableCell>{user.firstname}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="text-right">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="mt-4 flex items-center gap-2">
                            {users.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    preserveState
                                >
                                    <Button
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className="min-w-9"
                                    />
                                </Link>
                            ))}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
