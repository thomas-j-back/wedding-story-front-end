export type WeddingStoryForm = {
    requesterName: string;
    partnerName: string;
    style: string;
    requesterPhoto?: StyledPhotoState;
    partnerPhoto?: StyledPhotoState;
  };

  export type StyledPhotoState = {
    uploadKey?: string;
    uploadContentType?: string;
    generatedKey?: string;
    generatedUrl?: string;
    jobId?: string;
    numRestyles?: number;
  };
  