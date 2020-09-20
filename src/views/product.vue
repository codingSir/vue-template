<template>
      <div class="product">
            <a-form layout="inline" :form="form" @submit="handleSubmit">
                  <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                        <a-input
                                v-decorator="[
          'userName',
          { rules: [{ required: false, message: 'Please input your username!' }] },
        ]"
                                placeholder="Username"
                        >
                              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                        </a-input>
                  </a-form-item>
                  <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                        <a-input
                                v-decorator="[
          'password',
          { rules: [{ required: false, message: 'Please input your Password!' }] },
        ]"
                                type="password"
                                placeholder="Password"
                        >
                              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
                        </a-input>
                  </a-form-item>
                  <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
                              搜索
                        </a-button>
                  </a-form-item>
            </a-form>

            <a-table :columns="columns" :dataSource="data" bordered>
                  <template slot="name" slot-scope="text">
                        <a>{{ text }}</a>
                  </template>
            </a-table>
      </div>
</template>
<script>
    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            attrs: {},
        };
        if (index === 4) {
            obj.attrs.colSpan = 0;
        }
        return obj;
    };

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            tel: '0571-22098909',
            phone: 18889898989,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            tel: '0571-22098333',
            phone: 18889898888,
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'London No. 2 Lake Park',
        },
        {
            key: '5',
            name: 'Jake White',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: 'Dublin No. 2 Lake Park',
        },
    ];

    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    export default {
        data() {
            const columns = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    customRender: (text, row, index) => {
                        if (index < 4) {
                            return
                        <
                            a
                            href = "javascript:;" > {text} < /a>;
                        }
                        return {
                            children: < a
                        href = "javascript:;" > {text} < /a>,
                        attrs: {
                            colSpan: 5,
                        }
                    ,
                    }
                        ;
                    },
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    customRender: renderContent,
                },
                {
                    title: 'Home phone',
                    colSpan: 2,
                    dataIndex: 'tel',
                    customRender: (value, row, index) => {
                        const obj = {
                            children: value,
                            attrs: {},
                        };
                        if (index === 2) {
                            obj.attrs.rowSpan = 2;
                        }
                        // These two are merged into above cell
                        if (index === 3) {
                            obj.attrs.rowSpan = 0;
                        }
                        if (index === 4) {
                            obj.attrs.colSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    title: 'Phone',
                    colSpan: 0,
                    dataIndex: 'phone',
                    customRender: renderContent,
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    customRender: renderContent,
                },
            ];
            return {
                hasErrors,
                form: this.$form.createForm(this, {name: 'horizontal_login'}),
                data,
                columns,

            };
        },
        mounted() {
            this.$nextTick(() => {
                // To disabled submit button at the beginning.
                this.form.validateFields();
            });
        },
        methods: {
            // Only show error after a field is touched.
            userNameError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('userName') && getFieldError('userName');
            },
            // Only show error after a field is touched.
            passwordError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('password') && getFieldError('password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    }

</script>
<style lang="scss" scoped>
      .product {
            margin: 0 auto;
            padding: 40px;
      }
</style>