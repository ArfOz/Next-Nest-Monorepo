export default function Page({ params }: { params: { id: string } }) {
    return <div>My Id: {params.id}</div>;
}
