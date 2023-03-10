export type ResponseData<T> = {
   data: T;
   totalCount?: number;
   count?: number;
};

export type ComponentType = (props: any) => JSX.Element;
