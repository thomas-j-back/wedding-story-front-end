

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sm:px-4 md:px-16 lg:px-40">
            {children}
        </div>
    )
}