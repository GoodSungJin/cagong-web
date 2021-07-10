import { css } from '@emotion/react'
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const containerStyle = css`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 2rem;
`

const titleStyle = css`
  margin-bottom: 1rem;
`

const slotContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function FilledSlot({ onClickDelete, imageSrc }) {
  return (
    <div css={css`
      position: relative;
      flex: 1;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
      border-radius: 0.5rem;
      margin: 0 0.25rem;
    `}>
      <Image src={imageSrc} layout="fill" alt="uploaded image" />
      <div css={css`
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        background-color: #fff;
        border-radius: 100%;
        padding: 0.25rem; 
        transform: rotate(45deg);
      `} onClick={onClickDelete}>
        <Image src="/assets/plus.svg" width={16} height={16} alt="upload image" />
      </div>
    </div>
  )
}

function EmptySlot({ onClickUpload }) {
  return (
    <div css={css`
      flex: 1;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
      border-radius: 0.5rem;
      margin: 0 0.25rem;
    `} onClick={onClickUpload}>
      <label>
        <input type="file" css={css`display: none;`} onChange={onClickUpload} />
        <Image src="/assets/plus.svg" width={16} height={16} alt="upload image" />
      </label>
    </div>
  )
}

function Slot({
  slotData,
  onClickDelete,
  onClickUpload,
}){
  if(!!slotData) {
    return (
      <FilledSlot imageSrc={slotData} onClickDelete={onClickDelete}/>
    )
  }else {
    return (
      <EmptySlot onClickUpload={onClickUpload}/>
    )
  }
}

export default function FileUploadArea({
  uploadedSlot, setUploadedSlot
}) {
  const genDeleteSlot = (index) => (e) => {
    const slot = [...uploadedSlot]
    if(index === 0) slot.shift();
    else slot.splice(index, index);
    slot.push(null);
    setUploadedSlot(slot);
  };
  const pushSlot = async (e) => {
    if(!e.target?.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const resp = await axios.post("/images", formData, {
      headers: { 'content-type': 'multipart/formdata' },
    });
    const imageSrc = resp.data[0];
    const slot = [...uploadedSlot];
    for(let i in slot){
      if(!slot[i]){
        slot[i] = imageSrc;
        slot.splice(-1);
        break;
      }
    }
    setUploadedSlot(slot);
  }
  return (
    <div css={containerStyle}>
      <p css={titleStyle}>사진을 첨부해주세요</p>
      <div css={slotContainerStyle}>
        { uploadedSlot.map((e, index) => (
          <Slot slotData={e} key={e + index} onClickDelete={genDeleteSlot(index)} onClickUpload={pushSlot}/>
        ))}
      </div>
    </div>
  )
}