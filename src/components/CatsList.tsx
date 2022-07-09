import React, { useEffect, useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./../CatsList.css";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectCategoryData, selectCatList, setCategoryData, setCategoryList, addCategoryData } from '../store/catListSlice'


const CatsList = () => {


  const [menuCollapse, setMenuCollapse] = useState<boolean>(false);
  const [showMorebutton, setShowMorebutton] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const dispatch = useAppDispatch();
  const categoryList: any[] = useAppSelector(selectCatList);
  const categoryData: any[] = useAppSelector(selectCategoryData);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const onCategoryClickHandler = (item: any) => {
    setShowMorebutton(true);
    setActiveCategory(item.id);
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${item.id}`)
      .then(response => {
        if (response.status !== 200) {
          alert("Response Failed!");
          return;
        }
        return response.json();
      })
      .then(data => {
        dispatch(setCategoryData(data));
      });
  };

  const loadMoreCatsHandler = () => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${activeCategory}`)
      .then(response => {
        if (response.status !== 200) {
          alert("Response Failed!");
          return;
        }
        return response.json();
      })
      .then(data => {
        dispatch(addCategoryData(data));
      });
  };

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/categories')
      .then(response => {
        if (response.status !== 200) {
          alert("Response Failed!");
          return;
        }
        return response.json();
      })
      .then(data => {
        dispatch(setCategoryList(data));
      });
  }, []);

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Cat list" : "Cats Category List"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu >
              {categoryList.map((item, index) => (
                <MenuItem key={item.id} onClick={() => onCategoryClickHandler(item)}>
                  <div>
                    {`${++index} ${item.name}`}
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      <div className="galleryContainer">
        <div className="gallery">
          {categoryData.length > 0 && categoryData.map((photo, index) => (
            <figure key={index} className="catFrameContainer">
              <img src={photo.url} style={{ width: "inherit" }} />
            </figure>
          ))}
        </div>
        {showMorebutton &&
          <div className="loadMoreButton" onClick={loadMoreCatsHandler}>
            Load more cats...
          </div>
        }
      </div>
    </>
  );
};

export default CatsList;