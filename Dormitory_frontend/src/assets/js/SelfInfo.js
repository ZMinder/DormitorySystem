import request from "@/utils/request";

const {ElMessage} = require("element-plus");

export default {
    name: "selfInfo",  // 组件名称
    data() {
        // 手机号验证规则
        const checkPhone = (rule, value, callback) => {
            const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/; // 手机号格式正则表达式
            if (!value) {
                return callback(new Error("电话号码不能为空")); // 验证手机号是否为空
            }
            if (!Number.isInteger(+value)) {
                callback(new Error("请输入数字值")); // 验证是否为数字
            } else {
                if (phoneReg.test(value)) {
                    callback(); // 手机号格式正确
                } else {
                    callback(new Error("电话号码格式不正确")); // 手机号格式不正确
                }
            }
        };
        // 密码验证规则
        const checkPass = (rule, value, callback) => {
            if (!this.editJudge) { // 如果是编辑状态
                console.log("验证");
                if (value == "") {
                    callback(new Error("请再次输入密码")); // 验证密码是否为空
                } else if (value !== this.form.password) {
                    callback(new Error("两次输入密码不一致!")); // 验证两次密码是否一致
                } else {
                    callback();
                }
            } else {
                console.log("不验证");
                callback(); // 不在编辑状态时不验证密码
            }
        };
        return {
            showpassword: true, // 是否显示密码
            image: "", // 头像图片
            editJudge: true, // 密码编辑状态判断
            disabled: true, // 是否禁用表单
            dialogVisible: false, // 对话框是否可见
            identity: "", // 用户身份
            username: "", // 用户名
            name: "", // 姓名
            gender: "", // 性别
            age: "", // 年龄
            phoneNum: "", // 手机号
            email: "", // 邮箱
            targetURL: "", // 目标URL
            avatar: "", // 头像
            form: { // 表单数据
                username: "",
                name: "",
                gender: "",
                age: "",
                phoneNum: "",
                email: "",
            },
            rules: {
                username: [
                    {required: true, message: "请输入账号", trigger: "blur"},
                    {
                        pattern: /^[a-zA-Z0-9]{4,9}$/,
                        message: "必须由 4 到 9 个字母或数字组成",
                        trigger: "blur",
                    },
                ],
                name: [
                    {required: true, message: "请输入姓名", trigger: "blur"},
                    {
                        pattern: /^(?:[\u4E00-\u9FA5·]{2,10})$/,
                        message: "必须由 2 到 10 个汉字组成",
                        trigger: "blur",
                    },
                ],
                gender: [{required: true, message: "请选择性别", trigger: "change"}],
                age: [
                    {required: true, message: "请输入年龄", trigger: "blur"},
                    {type: "number", message: "年龄必须为数字值", trigger: "blur"},
                    {
                        pattern: /^(1|[1-9]\d?|100)$/,
                        message: "范围：1-100",
                        trigger: "blur",
                    },
                ],
                phoneNum: [{required: true, validator: checkPhone, trigger: "blur"}],
                email: [
                    {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"},
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {
                        min: 6,
                        max: 32,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                checkPass: [{validator: checkPass, trigger: "blur"}],
            },
            display: {
                display: "none", // 控制显示状态
            },
            imgDisplay: {
                display: "none", // 控制图片显示状态
            },
        };
    },
    created() {
        this.load(); // 组件创建后加载数据
        this.find(); // 查询数据
        this.init(this.avatar); // 初始化头像
    },
    methods: {
        load() {
            // 从sessionStorage获取用户信息并加载到表单
            this.form = JSON.parse(sessionStorage.getItem("user"));
            this.identity = JSON.parse(sessionStorage.getItem("identity"));
            this.username = this.form.username;
            this.name = this.form.name;
            this.gender = this.form.gender;
            this.age = this.form.age;
            this.phoneNum = this.form.phoneNum;
            this.email = this.form.email;
            this.avatar = this.form.avatar;
        },
        find() {
            // 查询数据并更新session
            request.post("/" + this.identity + "/login", this.form).then((res) => {
                window.sessionStorage.setItem("user", JSON.stringify(res.data));
                this.load();
            });
        },
        Edit() {
            // 开启编辑模式，显示对话框
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form = JSON.parse(sessionStorage.getItem("user"));
            });
        },
        cancel() {
            // 取消编辑，重置表单和状态
            this.$refs.form.resetFields();
            this.display = {display: "none"}; // 重置确认密码显示状态
            this.showpassword = true; // 密码可见性重置
            this.editJudge = true; // 重置编辑状态标志
            this.disabled = true; // 禁用表单输入
            this.dialogVisible = false; // 关闭对话框
        },
        async save() {
            // 保存修改后的用户信息
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    await request.put("/" + this.identity + "/update", this.form).then((res) => {
                        if (res.code === "0") {
                            ElMessage({
                                message: "修改成功",
                                type: "success",
                            });
                            // 更新本地存储
                            window.sessionStorage.setItem("user", JSON.stringify(this.form));
                            this.find(); // 重新加载数据
                            this.dialogVisible = false; // 关闭对话框
                        } else {
                            ElMessage({
                                message: res.msg,
                                type: "error",
                            });
                        }
                    });
                }
            });
        },
        EditPass() {
            // 开启或关闭密码编辑模式
            if (this.editJudge) {
                this.display = {display: "flex"}; // 显示密码输入框
                this.showpassword = false; // 允许输入新密码
                this.disabled = false; // 启用密码输入框
                this.editJudge = false; // 标记为编辑模式
            } else {
                this.display = {display: "none"}; // 隐藏密码输入框
                this.showpassword = true; // 隐藏新密码输入
                this.editJudge = true; // 退出编辑模式
                this.disabled = true; // 禁用密码输入
            }
        },
        async init(data) {
            // 初始化头像显示
            if (data === null || data === "") {
                console.log("用户未设置头像");
                this.imgDisplay = {display: "none"};
            } else {
                this.imgDisplay = {display: "block"};
                console.log("头像名称：" + data);
                await request.get("/files/initAvatar/" + data).then((res) => {
                    if (res.code === "0") {
                        this.image = res.data.data; // 加载头像数据
                    } else {
                        ElMessage({
                            message: res.msg,
                            type: "error",
                        });
                    }
                });
            }
        },
        async uploadSuccess() {
            // 处理头像上传成功
            this.form = JSON.parse(sessionStorage.getItem("user"));
            await request.post("/files/uploadAvatar/" + this.identity, this.form).then((res) => {
                if (res.code === "0") {
                    ElMessage({
                        message: "设置成功",
                        type: "success",
                    });
                    this.avatar = res.data; // 更新头像文件名
                    console.log("上传成功：" + this.avatar);
                    this.find(); // 更新信息
                    this.init(this.avatar); // 重新初始化头像
                } else {
                    ElMessage({
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        },
    },
};
