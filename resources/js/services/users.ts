import http from '@/lib/http';
import { User } from '@/types';

export interface UserResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface UserBasePayload {
    firstname: string;
    lastname: string;
    email: string;
}

export interface UserCreatePayload extends UserBasePayload {
    password: string;
    password_confirmation: string;
}

export interface UserUpdatePayload {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
}

export const UsersService = {
    all: async () => {
        const { data } = await http.get<{ data: User[] }>('/api//users');
        return data;
    },

    create: async (payload: UserCreatePayload) => {
        const { data } = await http.post<User>('/api/users', payload);
        return data;
    },

    update: async (id: number, payload: UserUpdatePayload) => {
        const { data } = await http.put<User>(`/api/users/${id}`, payload);
        return data;
    },

    delete: async (id: number) => {
        await http.delete(`/api//users/${id}`);
    },

    find: async (id: number) => {
        const { data } = await http.get<User>(`/api//users/${id}`);
        return data;
    },
};
