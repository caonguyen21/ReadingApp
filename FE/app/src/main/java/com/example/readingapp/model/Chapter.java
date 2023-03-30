package com.example.readingapp.model;

import java.io.Serializable;
import java.util.Date;

public class Chapter implements Serializable {

    private String _id;
    private String TenChapter;
    private Date NgayNhap;
    private boolean TrangThai;
    private String Truyen;

    public Chapter() {
    }

    public Chapter(int luotXem, boolean trangThai) {
        TrangThai = trangThai;
    }

    public Chapter(String _id, String tenChapter, Date ngayNhap, boolean trangThai, String truyen) {
        this._id = _id;
        TenChapter = tenChapter;
        NgayNhap = ngayNhap;
        TrangThai = trangThai;
        Truyen = truyen;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTenChapter() {
        return TenChapter;
    }

    public void setTenChapter(String tenChapter) {
        TenChapter = tenChapter;
    }

    public Date getNgayNhap() {
        return NgayNhap;
    }

    public void setNgayNhap(Date ngayNhap) {
        NgayNhap = ngayNhap;
    }

    public boolean isTrangThai() {
        return TrangThai;
    }

    public void setTrangThai(boolean trangThai) {
        TrangThai = trangThai;
    }

    public String getTruyen() {
        return Truyen;
    }

    public void setTruyen(String truyen) {
        Truyen = truyen;
    }

    @Override
    public String toString() {
        return "Chapter{" +
                "_id='" + _id + '\'' +
                ", TenChapter='" + TenChapter + '\'' +
                ", NgayNhap='" + NgayNhap + '\'' +
                ", TrangThai=" + TrangThai +
                ", Truyen='" + Truyen + '\'' +
                '}';
    }
}
