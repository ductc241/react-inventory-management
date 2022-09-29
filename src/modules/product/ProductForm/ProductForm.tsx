import React from "react";
import "./ProductForm.style.css";

const ProductForm = () => {
  return (
    <div className="container">
      <h1>Thêm Hàng</h1>
      <div style={{}}>
        <p>Thông tin</p>
        <p>Mô tả chi tiết</p>
        <p>Thành phần</p>
        <p>Bảo hành,bảo trì</p>
      </div>

      <div className="form">
        <div className="grid-container">
          <div className="grid-container_div item1">
            <label>Mã hàng</label>
            <input type="text" />
          </div>
          <div className="grid-container_div">
            <label>Giá vốn</label>
            <input type="text" />
          </div>
          <div className="grid-container_div item1">
            <label>Mã vạch</label>
            <input type="text" />
          </div>
          <div className="grid-container_div">
            <label>Giá bán</label>
            <input type="text" />
          </div>
          <div className="grid-container_div item1">
            <label>Tên Hàng</label>
            <input type="text" />
          </div>
          <div className="grid-container_div">
            <label>Tồn kho</label>
            <input type="text" />
          </div>
          <div className="grid-container_div item1">
            <label>Nhóm hàng</label>
            <input type="text" />
          </div>
          <div className="grid-container_div">
            <label>Trọng lượng</label>
            <input type="text" />
          </div>
        </div>
        <div>
          <div>
            <div>
              <label>Thương hiệu</label>
              <select id="selectbox2">
                <option value="">Month&hellip;</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div>
              <label>Vị trí</label>
              <input type="text" />
            </div>
          </div>
          <div>
            <div>
              <input type="checkbox" />
              <p>Bán trực tiếp</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Serial/Imei</p>
            </div>
          </div>
        </div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>

        <div />
      </div>
    </div>
  );
};

export default ProductForm;
