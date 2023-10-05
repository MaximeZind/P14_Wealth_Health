import {
  require_prop_types
} from "./chunk-PNSKILSM.js";
import "./chunk-4KLNKA2P.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/maximez_modal/src/Modal.jsx
var import_react4 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
import classes2 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_modal/src/styles/Modal.module.css";

// node_modules/maximez_modal/src/icons/CrossIcon.jsx
var import_react = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
function CrossIcon({ color, width, height }) {
  return import_react.default.createElement("svg", { fill: color, width, height, xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 11 11" }, import_react.default.createElement("path", { d: "M2.2,1.19l3.3,3.3L8.8,1.2C8.9314,1.0663,9.1127,0.9938,9.3,1C9.6761,1.0243,9.9757,1.3239,10,1.7\n	c0.0018,0.1806-0.0705,0.3541-0.2,0.48L6.49,5.5L9.8,8.82C9.9295,8.9459,10.0018,9.1194,10,9.3C9.9757,9.6761,9.6761,9.9757,9.3,10\n	c-0.1873,0.0062-0.3686-0.0663-0.5-0.2L5.5,6.51L2.21,9.8c-0.1314,0.1337-0.3127,0.2062-0.5,0.2C1.3265,9.98,1.02,9.6735,1,9.29\n	C0.9982,9.1094,1.0705,8.9359,1.2,8.81L4.51,5.5L1.19,2.18C1.0641,2.0524,0.9955,1.8792,1,1.7C1.0243,1.3239,1.3239,1.0243,1.7,1\n	C1.8858,0.9912,2.0669,1.06,2.2,1.19z" }));
}
CrossIcon.propTypes = {
  color: import_prop_types.default.string,
  width: import_prop_types.default.number,
  height: import_prop_types.default.number
};
var CrossIcon_default = CrossIcon;

// node_modules/maximez_modal/src/Span.jsx
var import_react2 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);
var import_react3 = __toESM(require_react(), 1);
import classes from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_modal/src/styles/Span.module.css";
function Span({ children, text, onClick, backgroundColor, hoveredBackgroundColor, fontColor, lineHeight, gridColumnStart, gridColumnEnd, fontSize, size, borderRadius, padding, position, top, right, zIndex }) {
  const [isHovered, setIsHovered] = (0, import_react3.useState)(false);
  return import_react2.default.createElement(
    "span",
    {
      className: classes.span,
      onClick,
      style: {
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: fontColor && fontColor,
        lineHeight: lineHeight ? lineHeight : "normal",
        gridColumnStart: gridColumnStart && gridColumnStart,
        gridColumnEnd: gridColumnEnd && gridColumnEnd,
        fontSize: fontSize && fontSize,
        height: size && `${size}px`,
        width: size && `${size}px`,
        borderRadius: borderRadius && borderRadius,
        paddingLeft: padding && padding,
        paddingRight: padding && padding,
        position: position && position,
        top: top && `${top}px`,
        right: right && `${right}px`,
        zIndex: zIndex && zIndex
      },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    children && children,
    text && text
  );
}
Span.propTypes = {
  children: import_prop_types2.default.node,
  text: (0, import_prop_types2.oneOfType)([
    import_prop_types2.default.string,
    import_prop_types2.default.number
  ]),
  onClick: import_prop_types2.default.func,
  backgroundColor: import_prop_types2.default.string,
  hoveredBackgroundColor: import_prop_types2.default.string,
  fontColor: import_prop_types2.default.string,
  lineHeight: import_prop_types2.default.string,
  gridColumnStart: (0, import_prop_types2.oneOfType)([
    import_prop_types2.default.string,
    import_prop_types2.default.number
  ]),
  gridColumnEnd: (0, import_prop_types2.oneOfType)([
    import_prop_types2.default.string,
    import_prop_types2.default.number
  ]),
  fontSize: import_prop_types2.default.string,
  size: import_prop_types2.default.number,
  borderRadius: import_prop_types2.default.string,
  padding: import_prop_types2.default.number,
  position: import_prop_types2.default.string,
  top: import_prop_types2.default.number,
  right: import_prop_types2.default.number,
  zIndex: import_prop_types2.default.number
};
var Span_default = Span;

// node_modules/maximez_modal/src/Modal.jsx
function Modal({ children, closeModal, maxWidth, modalBackgroundColor, iconColor, hoveredIconBackgroundColor }) {
  return import_react4.default.createElement(
    "div",
    {
      className: classes2.modal_background,
      style: {
        backgroundColor: modalBackgroundColor === "rgb(255,255,255)" ? "rgb(255,255,255, 0.6)" : "rgb(0,0,0, 0.7)"
      }
    },
    import_react4.default.createElement(
      "div",
      {
        className: classes2.modal,
        style: {
          maxWidth: maxWidth && `${maxWidth}px`,
          backgroundColor: modalBackgroundColor && modalBackgroundColor
        }
      },
      closeModal && import_react4.default.createElement(
        Span_default,
        {
          borderRadius: "50%",
          onClick: closeModal,
          hoveredBackgroundColor: hoveredIconBackgroundColor,
          size: 40,
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 999
        },
        import_react4.default.createElement(CrossIcon_default, { color: iconColor, height: 25, width: 25 })
      ),
      children
    )
  );
}
Modal.propTypes = {
  children: import_prop_types3.default.node.isRequired,
  closeModal: import_prop_types3.default.func,
  maxWidth: import_prop_types3.default.number,
  modalBackgroundColor: import_prop_types3.default.string,
  iconColor: import_prop_types3.default.string,
  hoveredIconBackgroundColor: import_prop_types3.default.string
};
var Modal_default = Modal;
export {
  Modal_default as Modal
};
//# sourceMappingURL=maximez_modal.js.map
