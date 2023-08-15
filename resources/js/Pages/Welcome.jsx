import { Link, Head } from '@inertiajs/inertia-react';
import GuestLayout from '@/Layouts/GuestLayout';
import Archive from '@/Components/Front/Blog/Archive';



export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>
                <Archive/>
            </GuestLayout>
        </>
    );
}
