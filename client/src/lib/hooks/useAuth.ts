import { todoService } from '@/components/todo/api/todo.api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth-user'],
        queryFn: async () => {
            try {
                const data = await todoService.getMe()
                console.log('DATA', data)
                return data
            } catch (error) {
                return null
            }
        },
        staleTime: Infinity, 
        retry: false
    });
};