"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

interface ITrack {
  _id: string;
  title: string;
  description: string;
  category: string;
  imgUrl: "chill1.png";
  trackUrl: string;
  countLike: number;
  countPlay: number;
}

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "TrackUrl",
    dataIndex: "trackUrl",
  },
  {
    title: "Uploader",
    dataIndex: ["uploader","name"], 
  },
  {
    title: "Action",
    dataIndex: "description",
  },
];

const TrackPageTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1); //trang hien tai
  const [pageSize, setPageSize] = useState<number>(4); // so luong user moi page
  const [total, setTotal] = useState<number>(0);
  const [listTrack, setListTrack] = useState<ITrack[]>([]);
  const access_token = localStorage.getItem("access_token") as string;
  console.log(access_token);

  const fetchListTrack = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks?current=${currentPage}&pageSize=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json(); //van tra ve promise =>> can await 1 lan nua
    if (data) {
      setListTrack(data.data.result);
      setTotal(data.data.meta.total);
    }
  };

  useEffect(() => {
    fetchListTrack();
  }, [pageSize,currentPage]);

  const onChange = (pagination: any) => {
    if (pagination && pagination.currentPage !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
    console.log("params", pagination);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={listTrack}
        onChange={onChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
          //return ReatNode => return 1 phan tu html
        }}
      />
    </div>
  );
};

export default TrackPageTable;
