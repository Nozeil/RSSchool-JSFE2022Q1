import { TSources } from '../types/sourcesDataSources';

export default interface SourcesData {
    status: string;
    sources: Array<TSources>;
}
