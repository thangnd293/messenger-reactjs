type ResponseData<T> = {
   data: T;
   totalCount?: number;
   count?: number;
};

type ComponentType = (props: any) => JSX.Element;

type SetValue<T> = (value: T | ((prevState: T) => T)) => void;
