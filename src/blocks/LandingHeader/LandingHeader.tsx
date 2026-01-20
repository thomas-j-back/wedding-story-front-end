import PageLayout from "@/components/pageLayout/PageLayout"

export default function LandingHeader() {
    return (
        <div className="text-white w-full min-h-[60vh] md:min-h-[65vh] flex items-center bg-primary-600">
            <PageLayout>
                <p className="text-5xl text-muted">Share your story</p>
            </PageLayout>
        </div>
    )
}