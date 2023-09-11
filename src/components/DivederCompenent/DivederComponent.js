import styles from "./DividerComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DividerComponent = ({ rows, columns, gap, children}) => {
  const gridTemplateRows = `repeat(${rows}, 1fr)`;
  const gridTemplateColumns = `repeat(${columns}, 1fr)`;
  
  const containerStyle = {
    display: 'grid',
    gridTemplateRows,
    gridTemplateColumns,
    gap: `${gap}px` || '10px',
  };

  const items = [];
  for (let i = 0; i < rows * columns; i++) {
    items.push(<div key={i} className="item"></div>);
  }

  return <div className="container" style={containerStyle}>{children}</div>;
};

export default DividerComponent;