import ForgetForm from "@/components/forgePassword";

export default function Home() {
    return (
        <section className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <ForgetForm />
        </section>
    );
}