"use client"
export const Heart = () => {
  return (
    <div className="flex justify-center my-4 w-full">
      <div className="relative w-[30px] h-[30px]">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          stroke="red"
          strokeWidth="0.00024"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          <g id="SVGRepo_iconCarrier">
            <g>
              {/* Thẻ path trống này đôi khi gây lỗi tính toán vùng nhìn trên Safari, có thể bỏ qua */}
              <path fill="none" d="M0 0H24V24H0z"></path>
              <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export const Heart1 = () => {
  return (
    <div className="flex justify-center items-center mt-0 mb-4 w-full">
      <div className="relative flex justify-center items-center" style={{ width: 30, height: 30 }}>
        {/* Đường kẻ trái */}
        <div
          style={{
            background: "#f0394d",
            height: "2px", // Giảm xuống 2px cho thanh thoát
            top: "50%",
            right: "35px",
            width: "150px",
            maxWidth: "30vw",
            position: "absolute",
            transform: "translateY(-50%)",
          }}
        ></div>

        {/* Trái tim trung tâm */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          fill="#f0394d"
          style={{ display: "block", flexShrink: 0 }}
        >
          <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
        </svg>

        {/* Đường kẻ phải */}
        <div
          style={{
            background: "#f0394d",
            height: "2px",
            top: "50%",
            left: "35px",
            width: "150px",
            maxWidth: "30vw",
            position: "absolute",
            transform: "translateY(-50%)",
          }}
        ></div>
      </div>
    </div>
  )
}

export const Heart2 = () => {
  return (
    <div className="flex justify-center my-4 w-full">
      <div
        className="flex justify-center items-center shadow-sm"
        style={{
          borderRadius: "50%",
          width: 32,
          height: 32,
          backgroundColor: "#ffffff",
          flexShrink: 0
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="20" // Kích thước icon nhỏ hơn vòng tròn (32px)
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          style={{ display: "block" }}
        >
          <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
        </svg>
      </div>
    </div>
  )
}
