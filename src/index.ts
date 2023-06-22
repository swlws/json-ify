/**
 * 数据类型声明
 */
const enum DataType {
  ARROW_FN = "_AsEaAf_",
  RegExp = "_KiGyRg_",
  MAP = "_AggMap_",
  SET = "_KhsSet_",
}

type ISupportType = keyof typeof Strategy;

const DATE_REG = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

function getDataType(v: any) {
  return Object.prototype.toString.call(v).slice(8, -1);
}

function mapToArr(map: Map<any, any>) {
  let rt: [key: any, value: any][] = [];
  map.forEach((value, key) => {
    rt.push([key, value]);
  });
  return rt;
}

function setToArr(set: Set<any>) {
  let rt: any[] = [];
  set.forEach((value) => {
    rt.push(value);
  });
  return rt;
}

const Strategy = {
  Function: {
    stringify: (value: any): string => {
      let content = value.toString();

      if (content.length < 8 || content.substring(0, 8) !== "function") {
        return DataType.ARROW_FN + content;
      }

      return content;
    },
  },
  RegExp: {
    stringify: (value: any): string => {
      return DataType.RegExp + value;
    },
  },
  Map: {
    stringify: (value: any): string => {
      return DataType.MAP + stringify(mapToArr(value));
    },
  },
  Set: {
    stringify: (value: any): string => {
      return DataType.SET + stringify(setToArr(value));
    },
  },
};

/**
 * 序列化
 *
 * @param obj 待序列化对象
 * @param space 缩进
 * @returns
 */
export function stringify(obj: any, space?: string | number) {
  return JSON.stringify(
    obj,
    function (key, value) {
      const type = getDataType(value);

      if (Object.keys(Strategy).includes(type)) {
        return Strategy[type as ISupportType].stringify(value);
      }

      return value;
    },
    space
  );
}

/**
 * 反序列化
 *
 * @param str
 * @returns
 */
export function parse(str: string): any {
  return JSON.parse(str, function (key, value) {
    if (typeof value != "string") return value;

    if (value.length < 8) return value;

    const prefix = value.substring(0, 8);

    if (DATE_REG.test(value)) {
      return new Date(value);
    }

    if (prefix === "function") {
      return eval("(" + value + ")");
    }
    if (prefix === DataType.ARROW_FN) {
      return eval(value.slice(8));
    }
    if (prefix === DataType.RegExp) {
      return eval(value.slice(8));
    }
    if (prefix === DataType.MAP) {
      return new Map(parse(value.slice(8)));
    }
    if (prefix === DataType.SET) {
      return new Set(parse(value.slice(8)));
    }

    return value;
  });
}
