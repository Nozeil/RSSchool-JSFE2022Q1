export default interface SourcesData {
    status: string;
    sources: Array<{
        id: string;
        name: string;
        description: string;
        url: string;
        category: string;
        language: string;
        country: string;
    }>;
}
