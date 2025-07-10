/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Injectable } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;

    constructor(private configService: ConfigService) {
        this.bucket = process.env.MINIO_BUCKET as string
        this.s3 = new S3Client({
            region: process.env.MINIO_REGION as string,
            endpoint: process.env.MINIO_ENDPOINT as string,
            credentials: {
                accessKeyId: process.env.MINIO_ACCESS_KEY as string,
                secretAccessKey: process.env.MINIO_SECRET_KEY as string,
            },
            forcePathStyle: true,
        });
    }

    async uploadFile(key: string, body: Buffer, mimetype: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: mimetype,
        });

        await this.s3.send(command);

        return `${this.configService.get('MINIO_ENDPOINT')}/${this.bucket}/${key}`;
    }

    async getFileStream(key: string) {
        const bucket = process.env.MINIO_BUCKET as string;
        const command = new GetObjectCommand({ Bucket: bucket, Key: key });
        const response = await this.s3.send(command);
        return response.Body as Readable;
    }

    async getPresignedUrl(key: string, expiresIn = 600): Promise<string> {
        const bucket = process.env.MINIO_BUCKET as string;
        const command = new GetObjectCommand({ Bucket: bucket, Key: key });

        const signedUrl = await getSignedUrl(this.s3, command, { expiresIn });

        return signedUrl;
    }

}
