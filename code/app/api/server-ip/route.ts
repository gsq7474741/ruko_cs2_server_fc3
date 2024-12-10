// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import * as $Util from '@alicloud/tea-util';
import * as dotenv from 'dotenv';
import { access } from 'fs';
import { NextResponse } from 'next/server';
import { env } from 'process';

// 加载环境变量
dotenv.config({ path: '.env.local' });

export async function GET() {
  try {
    // 获取环境变量
    const accessKeyId = process.env.ALICLOUD_ACCESS_KEY_ID;
    const accessKeySecret = process.env.ALICLOUD_ACCESS_KEY_SECRET;
    console.log('Access Key ID:', accessKeyId);
    console.log('Access Key Secret:', accessKeySecret);
    const regionId = 'cn-beijing'; // Beijing region

    if (!accessKeyId || !accessKeySecret) {
      console.error('Missing environment variables:', {
        hasAccessKeyId: !!accessKeyId,
        hasAccessKeySecret: !!accessKeySecret
      });
      throw new Error('Missing Alibaba Cloud credentials');
    }


    const config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret,
      regionId,
      endpoint: 'ecs.cn-beijing.aliyuncs.com',
    });

    const params = new $OpenApi.Params({
      // 接口名称
      action: "DescribeInstances",
      // 接口版本
      version: "2014-05-26",
      // 接口协议
      protocol: "HTTPS",
      // 接口 HTTP 方法
      method: "POST",
      authType: "AK",
      style: "RPC",
      // 接口 PATH
      pathname: `/`,
      // 接口请求体内容格式
      reqBodyType: "json",
      // 接口响应体内容格式
      bodyType: "json",
    });

    const client = new OpenApi(config);
    // query params
    const queries = {
      RegionId: "cn-beijing",
    };
    // runtime options
    const runtime = new $Util.RuntimeOptions({});
    const request = new $OpenApi.OpenApiRequest({
      query: OpenApiUtil.query(queries),
    });
    // 复制代码运行请自行打印 API 的返回值
    // 返回值实际为 Map 类型，可从 Map 中获得三类数据：响应体 body、响应头 headers、HTTP 返回的状态码 statusCode。
    const response = await client.callApi(params, request, runtime);
    const ip = response.body?.Instances?.Instance?.[0]?.PublicIpAddress?.IpAddress?.[0]
    console.log(response);
    console.log(ip);


    if (ip) {
      return NextResponse.json({ ip });
    } else {
      throw new Error('No instance found or no public IP available');
    }
  } catch (error) {
    console.error('Error fetching server IP:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch server IP',
        msg: error,
        env: {
          ALICLOUD_ACCESS_KEY_ID: process.env.ALICLOUD_ACCESS_KEY_ID,
          ALICLOUD_ACCESS_KEY_SECRET: process.env.ALICLOUD_ACCESS_KEY_SECRET,
        },
        envs: process.env

      },
      { status: 500 }
    );
  }
}
