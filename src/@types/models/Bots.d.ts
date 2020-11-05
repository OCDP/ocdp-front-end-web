/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface Bot {
    id: string;
    name: string;
    description: string;
    avatar?: any;
    flows: Models.MiniFlow[];
  }

  interface MiniBot {
    avatar?: string;
    description?: string;
    id: string;
    name: string;
  }

  interface DataChartBot {
    label: string;
    value: number;
    color: string;
  }
}
