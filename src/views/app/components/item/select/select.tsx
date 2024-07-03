import React, { useState, useImperativeHandle } from "react";
import "./select.scss";
import { SelectItemType, SelectDataType } from "./interface";

export interface SelectProps {
  getSelectValue?: (item: SelectItemType, index: number) => void;
}
export interface SelectRef {
  handleIsShow?: (data: SelectDataType, index: number) => void;
}

const InnerSelect: React.ForwardRefRenderFunction<SelectRef, SelectProps> = (
  props,
  ref
) => {
  const { getSelectValue } = props;
  const [isShow, setIsSHow] = useState<boolean>(false);
  const [data, setData] = useState<SelectDataType>();
  const [curIndex, setCurIndex] = useState<number>();

  const handleIsShow = (data: SelectDataType, index: number) => {
    setIsSHow(!isShow);
    setData(data);
    setCurIndex(index);
  };

  const handleConfirm = () => {
    setIsSHow(false);
  };

  const handleSelect = (item: SelectItemType) => {
    data?.fn(item);
    setIsSHow(false);
    getSelectValue?.(item, curIndex!);
  };

  useImperativeHandle(ref, () => {
    return { handleIsShow };
  });

  return (
    <>
      {isShow && (
        <div className="select">
          <div className="select-content">
            <div className="select-content-top">
              <div
                className="select-content-left"
                onClick={() => handleIsShow({} as SelectDataType, 0)}
              >
                取消
              </div>
              <div className="select-content-middle">{data?.subTitle}</div>
              <div className="select-content-right" onClick={handleConfirm}>
                确定
              </div>
            </div>
            <div className="select-content-list">
              {data?.list.map((item, idx) => {
                return (
                  <div
                    onClick={() => handleSelect(item)}
                    className="select-content-list-item"
                    key={idx}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const Select = React.forwardRef(InnerSelect);
export default Select;
