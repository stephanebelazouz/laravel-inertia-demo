import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, Pencil, Plus } from 'lucide-react';

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
                                <Button>
                                    <Plus />
                                    Add user
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Firstname</TableHead>
                                    <TableHead>Lastname</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">
                                        Created at
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Updated at
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.data.map((user: User) => (
                                    <TableRow key={user.id}>
                                        {' '}
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
                                        <TableCell>
                                            <div className="flex justify-center gap-4">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/users/${user.id}`,
                                                        )
                                                    }
                                                >
                                                    <>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </>
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/users/${user.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    <>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </>
                                                </Button>
                                            </div>
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
