'use server'

import fs from 'node:fs'
import path from 'node:path'

async function saveResume(fileName: string, fileBuffer: Buffer) {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const filePath = path.join(publicDir, fileName)
    fs.writeFileSync(filePath, Buffer.from(fileBuffer))
    return filePath
  } catch (error) {
    console.error('Error saving resume:', error)
    throw error
  }
}

export default saveResume
