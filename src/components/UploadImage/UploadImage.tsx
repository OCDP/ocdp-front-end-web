import React, { memo, useState, useCallback } from "react";
import "./UploadImage.less";
import { Upload } from "antd";
import getBase64 from "utils/getBase64";
import { defaultImageUrl } from "utils/constants";
import FadeLoading from "components/FadeLoading";
import handleApiError from "utils/feedback/handleApiError";
import { usePostImageMessage } from "hooks/networking/uploadImage";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const UploadImage: React.FC<Props> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false);
  const [b64, setB64] = useState<string | undefined>();
  const postImageMessage = usePostImageMessage();

  const UploadImage = useCallback(
    async (b64: string) => {
      try {
        const { data } = await postImageMessage({
          b64,
        });
        onChange(data.url);
      } catch (err) {
        throw err;
      }
    },
    [onChange, postImageMessage]
  );

  const handleUpload = async (e: any) => {
    setLoading(true);
    try {
      const b64 = await getBase64(e.file);
      setB64(b64);
      await UploadImage(b64);
    } catch (err) {
      handleApiError({
        error: err.data,
        content: "Ocorreu um erro ao fazer upload da imagem.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      customRequest={handleUpload}
      accept="image/*"
    >
      <img
        src={value || defaultImageUrl || b64}
        alt="avatar"
        style={{ width: 40, height: 40 }}
      />
      <FadeLoading loading={loading} />
    </Upload>
  );
};

export default memo(UploadImage);
