/** 上传文件 */

import { _ } from '@zto/zpage'

import type { AppContextOptions } from '@zto/zpage'

export interface UploadStoreOptions {
  [prop: string]: any
}

export interface UploadOptions extends AppContextOptions {
  storePath?: string
  storeGroup?: string
  storeOptions?: UploadStoreOptions
}

export interface UploadRescOption {
  icon: string
  accept: string
}

export const UploadRescOptions: Record<string, UploadRescOption> = {
  image: {
    icon: 'photo',
    accept: 'image/*'
  },
  file: {
    icon: 'add-square',
    accept: ''
  },
  video: {
    icon: 'video',
    accept: 'video/*'
  },
  audio: {
    icon: 'volume',
    accept: 'audio/*'
  },
  office: {
    icon: 'font',
    accept: '.pdf,.xlsx,.xls,.docx,.doc,.ppt,.pptx'
  }
}

/** 执行文件上传 */
export async function upload(file: File, options: UploadOptions) {
  const app = options.app

  const uploadCfg = app.useComponentsConfig('file.upload')

  const uploadFn = uploadCfg?.fn
  const realOptions = _.omitNil(options)
  const uploadOptions = { ...uploadCfg, ...realOptions }

  const result = await uploadFn(file, uploadOptions)

  return result
}

/** 根据类型获取上传输入选项 */
export function getUploadRescOption(type: string = 'image') {
  return UploadRescOptions[type] || UploadRescOptions['image']
}
