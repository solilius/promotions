import { connect } from 'mongoose';

export const connectToDatabase = async (uri: string) => await connect(uri);
