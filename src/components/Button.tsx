import styled from "styled-components";

interface ISelected {
  selected?: boolean;
}

export default styled.button<ISelected>`
  width: 180px;
  height: 45px;
  border-radius: 100px;
  background-color: ${(props) => (props.selected ? "#00ADD2" : "#ECEDEE")};
  border: 0;
  color: ${(props) => (props.selected ? "#fff" : "#7E868E")};
  margin-right: 18px;

  transition: color 0.4s ease-in;

  :hover {
    cursor: pointer;
  }
`;
