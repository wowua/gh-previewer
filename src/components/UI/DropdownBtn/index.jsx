import React, { useState } from "react";
import Icon from "@ui/Icon";
import PropTypes from "prop-types";
import {
  Container, Display, Dropdown, List, Item, Button, Indicator,
} from "./DropdownBtn.styles";

const DropList = ({ list, onItemChange, currentItem }) => (
  <List>
    {
      list.map((item) => (
        <Item data-cy-id={item.name} active={item.name === currentItem} key={item.name}>
          <Button onClick={() => onItemChange(item)}>
            {item.name}
            <Indicator>
              <Icon symbol="check" width="10" height="10" fill="#63A9F3" />
            </Indicator>
          </Button>
        </Item>
      ))
    }
  </List>
);

DropList.propTypes = {
  list: PropTypes.array,
  onItemChange: PropTypes.func,
  currentItem: PropTypes.string,
};

const DropdownBtn = ({ list, title, onChange }) => {
  const [choosenItemName, setChoosenItemName] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const changeItem = (item) => {
    setIsOpened(false);
    setChoosenItemName(item.name);
    onChange(item);
  };

  const btnDisplayedTitle = choosenItemName.length ? `: ${choosenItemName}` : "";

  return (
    <Container>
      <Display data-cy-id="filtering-btn" active={isOpened} onClick={() => setIsOpened(!isOpened)}>
        {title}
        {btnDisplayedTitle}
      </Display>
      {isOpened
        && (
          <Dropdown data-cy-id="filtering-list">
            <DropList
              list={list}
              onItemChange={(item) => changeItem(item)}
              currentItem={choosenItemName}
            />
          </Dropdown>
        )}
    </Container>
  );
};

DropdownBtn.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    query: PropTypes.object,
  })),
  title: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropdownBtn;
