import LandingHeader from "@/blocks/LandingHeader/LandingHeader";
import PageLayout from "@/components/pageLayout/PageLayout";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import { Accordion, AccordionSummary, Typography } from "@mui/material";

export default function LandingPage() {
    return (
        <>
            <LandingHeader />
            <PageLayout>
                <div className="flex justify-center py-16">
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>How does it work?</Typography>
                            <Accordion>
                                <AccordionSummary>
                                    <Typography>Turn you and your partner into stylized characters!</Typography>
                                </AccordionSummary>
                            </Accordion>
                            <Button variant="outlined">Create a chapter!</Button>
                        </CardContent>
                    </Card>
                </div>
            </PageLayout>
        </>
    )
}