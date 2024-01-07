export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface ITracksTop {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    uploader: {
      _id: string;
      email: string;
      name: string;
      role: string;
      type: string;
    };
    isDeleted: boolean;
    // __v: 0;
    createdAt: string;
    updatedAt: string;
  }

  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ITrackComments {
    content: string;
    moment: any;
    user: string;
    track: string;
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface IAuthUser {}

  interface IShareTrack extends ITrackTop {
    isPlaying: boolean;
  }

  interface ITrackContext {
    currentTrack: IShareTrack;
    setCurrentTrack: (v: IShareTrack) => void;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ITrackLike {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    createdAt: string;
    updatedAt: string;
  }
}
