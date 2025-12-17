import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const relationshipStorySchema = z.object({
    relationshipHistory: z.string().min(1),
});

export default function RelationshipStoryBuild() {
    //Just create a simple form page asking some questions about relationship history
    return (
        <div>
            <h1>Relationship Story Build</h1>
        </div>
    )
}