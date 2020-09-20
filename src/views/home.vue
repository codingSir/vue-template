<template>
	<div class="home">
		<a-row :gutter="16">
			<a-col :span="12">
				<a-statistic-countdown
					title="Countdown"
					:value="deadline"
					@finish="onFinish"
					style="margin-right: 50px"
				/>
			</a-col>
			<a-col :span="12">
				<a-statistic-countdown
					title="Million Seconds"
					:value="deadline"
					format="HH:mm:ss:SSS"
					style="margin-right: 50px"
				/>
			</a-col>
			<a-col :span="24" style="margin-top: 32px;">
				<a-statistic-countdown title="Day Level" :value="deadline" format="D 天 H 时 m 分 s 秒" />
			</a-col>
		</a-row>

	</div>
</template>

<script>
	// /^(\d+\.?\d{1,2}?)%$/	百分比正则
	// /^\d+(\.\d{1,2})?$/	小数正则
	// /^[1-9][0-9]*$/	非0正整数
	// /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/   6-12位数字和字母组合密码正则
	// 日期正则
	// /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test('2019-12-06')
	// /^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/.test('20191231')
	// /^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(20|21|22|23|[0-1]\d)[0-5]\d$/.test('201912302020')
	export default {
		name: "home",
        data() {
            return {
                deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
            };
        },
        methods: {
            onFinish() {
                console.log('finished!');
            },
        },
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/iconfont/iconfont.css";

	.home {
		display: flex;
		flex-flow: column;
		align-items: center;
		text-align: center;
		line-height: 1.2;
        // background: url(~@assets/logo.png) no-repeat center; /*css使用alias示例*/
	}
</style>
