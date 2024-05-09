import React from 'react'
import * as MdIcons from "react-icons/md";
import * as TfiIcons from "react-icons/tfi";
import * as LiaIcons from "react-icons/lia";

const AdminSideBarData = [
    {
        title: 'Dashboard',
        path: '/Admin/Dashboard',
        icon: <MdIcons.MdDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Announcements',
        path: '/Admin/Announcements',
        icon: <TfiIcons.TfiAnnouncement />,
        cName: 'nav-text'
    },
    {
        title: 'Events',
        path: '/Admin/Events',
        icon: <MdIcons.MdEventAvailable />,
        cName: 'nav-text'
    },
    {
        title: 'Articles',
        path: '/Admin/Articles',
        icon: <MdIcons.MdArticle />,
        cName: 'nav-text'
    },
    {
        title: 'Teachers',
        path: '/Admin/Teachers',
        icon: <LiaIcons.LiaChalkboardTeacherSolid />,
        cName: 'nav-text'
    }
]

export default AdminSideBarData