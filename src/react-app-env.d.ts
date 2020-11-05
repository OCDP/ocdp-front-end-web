/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

declare module "less-vars-to-js";

declare type RuntimeVariables = { [key: string]: string | undefined };

declare const variables: RuntimeVariables;

/**
 * Pacote de interfaces que representam as Actions de um reducer.
 */
namespace Actions {
  /**
   * @see ~/src/@types/actions/*
   */
}

/**
 * Pacote de interfaces destinadas a definir os tipos dos objetos que
 * representam os contextos.
 */
namespace Contexts {
  /**
   * @see ~/src/@types/contexts/*
   */
}

/**
 * Pacote de interfaces que representam a modelagem de uma determinada regra de
 * negócio a nível de API.
 */
namespace Models {
  /**
   * @see ~/src/@types/models/*
   */
}

interface Dict<T> {
  [key: string]: T;
}

class AppError extends Error {
  data: {
    errors: Utils.ApiError.Errors;
  };

  constructor(errors: Utils.ApiError.Errors) {
    super();
    if (errors) {
      this.data = { errors };
    }
  }
}

namespace Utils {
  interface ApiError {
    status: number;
    errors: ApiError.Errors;
    exception: string;
  }

  namespace ApiError {
    type Errors = Dict<string[] | string>;
  }

  type UF =
    | "AC"
    | "AL"
    | "AP"
    | "AM"
    | "BA"
    | "CE"
    | "DF"
    | "ES"
    | "GO"
    | "MA"
    | "MT"
    | "MS"
    | "MG"
    | "PA"
    | "PB"
    | "PR"
    | "PE"
    | "PI"
    | "RJ"
    | "RN"
    | "RS"
    | "RO"
    | "RR"
    | "SC"
    | "SP"
    | "SE"
    | "TO";

  type ValidateStatus = "validating" | "success" | "warning" | "error" | "";

  interface IPage<T> {
    results: T[];
    next?: string;
    previous?: string;
    count: number;
    page_size: number;
  }

  interface PaginateParams {
    offset: number;
    limit: number;
  }

  interface CustomFormProps<T> {
    form: FormInstance;
    onFinish: (values: T) => void;
    initialValues?: T;
  }

  interface CustomFilterProps<T> {
    onFilter?: (...changes: T[]) => void;
    filters?: T;
    filtering?: boolean;
  }
}
