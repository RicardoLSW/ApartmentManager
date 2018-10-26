let menuConfig = [
    {
        id: "stu_menu",
        title: "学生管理",
        item: [
            {
                text: "新增学生",
                url: "/student/addStudent"
            },
            {
                text: "学生列表",
                url: "/student/student_list"
            }
        ]
    },
    {
        id: "dorm_menu",
        title: "宿舍管理",
        item: [
            {
                text: "新增宿舍",
                url: "/dorm/addDorm"
            },
            {
                text: "宿舍列表",
                url: "/dorm/dorm_list"
            },
            {
                text: "楼栋列表",
                url: "#"
            }
        ]
    },
    {
        id: "dormadmin_menu",
        title: "宿管管理",
        item: [
            {
                text: "新增宿管",
                url: "/dormadmin/addDormadmin"
            },
            {
                text: "宿管列表",
                url: "/dormadmin/dormadmin_list"
            }
        ]
    }
]

module.exports = menuConfig;