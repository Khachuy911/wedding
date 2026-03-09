"use client"
import { CollapseSection } from "@/components/CollapseSection";
import { appWeddingClient } from "@/lib/ApiClient";
import { LOVE_TIMELINE_EMOJIS, toBase64 } from "@/lib/utils";
import { MoveDown, MoveUp, PlusCircle, Trash2, X } from 'lucide-react';
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input, TextArea } from "../users/page";

interface TimelineItem {
    id: string;
    title: string;
    desc: string;
    image: string | File | null;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const StoryTimeLine = () => {
    const [data, setData] = useState([]);
    const [storyTimeline, setStoryTimeline] = useState<TimelineItem[]>([]);

    useEffect(() => {
        appWeddingClient.getTimeline().then(e => {
            setData(e.data)
        })

    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setStoryTimeline(data);
    }, [data]);

    const [newItem, setNewItem] = useState<Omit<TimelineItem, 'id'>>({ title: '', desc: '', image: null });

    const handleFieldChange = (index: number, field: keyof Omit<TimelineItem, 'id'>, value: string) => {
        const updatedItems = [...storyTimeline];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setStoryTimeline(updatedItems);
    };

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;

        const updatedItems = [...storyTimeline];
        updatedItems[index] = { ...updatedItems[index], image: file };
        setStoryTimeline(updatedItems);
        e.target.value = '';
    };

    const handleRemoveFile = async (id: string, index: number) => {
        try {
            const updatedItems = [...storyTimeline];
            updatedItems[index] = { ...updatedItems[index], image: null };
            await appWeddingClient.removeFileTimeline(id)
            setStoryTimeline(updatedItems);
        } catch (error) {
            toast.error("Xoá file không thành công!")
        }

    };
    const handleNewItemImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewItem({ ...newItem, image: file });
        e.target.value = '';
    };

    const handleAddItem = async () => {
        if (!newItem.title.trim()) {
            alert("Vui lòng nhập Tiêu đề cho mục mới.");
            return;
        }
        try {
            const data = {
                ...newItem
            }
            if (newItem.image) {
                data.image = await toBase64(newItem.image as File)
            }
            const rs = await appWeddingClient.createTimeline(data)
            setStoryTimeline([...storyTimeline, rs.data]);
            setNewItem({ title: '', desc: '', image: null });
            setIsModalOpen(false);
        } catch {
            toast.error("Lỗi thêm timeline, hãy thử lại sau!")
        }

    };

    const handleRemoveItem = async (id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa cột mốc này khỏi Timeline?")) {
            try {

                await appWeddingClient.deleteTimeline(id)
                setStoryTimeline(storyTimeline.filter(item => item.id !== id));
                toast.success("Xoá dòng thời gian thành công!")
            } catch {
                toast.error("Xoá dòng thời gian thất bại!")

            }
        }
    };

    const handleMoveItem = async (id: string, index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= storyTimeline.length) {
            return;
        }
        try {

            await appWeddingClient.updateTimeline(id, { arrow: direction })

            const updatedItems = [...storyTimeline];
            [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];
            setStoryTimeline(updatedItems);
        } catch {
            toast.error("Lỗi di chuyển timeline, hãy thử lại sau!")
        }

    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-start m-0">
                    <p className="text-sm text-gray-500 max-w-[calc(100%-140px)] mr-4">
                        Quản lý các cột mốc quan trọng trong câu chuyện tình yêu của bạn. Nhấn &quot;Thêm Mới&quot; để mở cửa sổ nhập liệu.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}

                        className="flex items-center justify-center py-2 px-3 
                                border border-transparent rounded-md text-sm font-medium 
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-indigo-500 transition whitespace-nowrap"
                        title="Thêm cột mốc mới"
                    >
                        <PlusCircle size={16} className="mr-1" /> Thêm Mới
                    </button>
                </div>

                <h3 className="font-semibold text-gray-700">📋 Danh sách dòng thời gian ({storyTimeline.length} mục):</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto p-2 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                    {storyTimeline.length === 0 && (
                        <p className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-gray-500 italic p-4">Chưa có mục dòng thời gian nào. Hãy nhấn **Thêm Mục dòng thời gian Mới** để bắt đầu!</p>
                    )}
                    {storyTimeline.map((item, index) => (

                        <div key={item.id} className="relative p-3 border border-indigo-200 rounded-lg bg-white shadow-md flex flex-col transition hover:shadow-lg">

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xl font-extrabold text-indigo-700 leading-none">{index + 1}.</span>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="cursor-pointer text-red-500 hover:text-red-700 transition p-1"
                                    title="Xóa mục này"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex-grow space-y-1">
                                <Input
                                    type="text"
                                    label="Tiêu đề"
                                    value={item.title}
                                    placeholder="Tiêu đề"
                                    onChange={(e: any) => handleFieldChange(index, 'title', e.target.value)}
                                    className="w-full border p-1 rounded-md font-semibold text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <TextArea
                                    label="Mô tả"
                                    value={item.desc}
                                    placeholder="Mô tả"
                                    onChange={(e: any) => handleFieldChange(index, 'desc', e.target.value)}
                                    rows={5}
                                />

                                <div className="flex items-center space-x-2 pt-2">
                                    {(item.image) && (
                                        <>
                                            <div className="relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image as string}
                                                    alt={`Timeline Image ${index + 1}`}
                                                    className="w-10 h-10 object-cover rounded-md border"
                                                />
                                                <div onClick={() => {
                                                    handleRemoveFile(item.id, index)
                                                }} className="p-2 cursor-pointer absolute top-[-12] right-[-12] " style={{ color: "red" }}>
                                                    <X size={12} />
                                                </div>
                                            </div>
                                        </>

                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e)}

                                        className="
                                            flex-1 min-w-0 max-w-full 
                                            text-xs text-gray-600 file:py-1 
                                            file:px-2 file:cursor-pointer file:rounded-full 
                                            file:border-0 file:text-xs file:font-medium 
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100 cursor-pointer 
                                            overflow-hidden whitespace-nowrap file:flex"
                                    />
                                    <button
                                        onClick={async () => {
                                            try {
                                                const newData = {
                                                    ...item
                                                }
                                                const file = item?.image as File
                                                if (file?.name) {
                                                    newData.image = await toBase64(file)
                                                }
                                                else {
                                                    newData.image = null
                                                }
                                                await appWeddingClient.updateTimeline(item.id, newData)
                                                toast.success("Cập nhật dòng thời gian thành công!")
                                            } catch {
                                                toast.error("Cập nhật dòng thời gian thất bại, hãy thử lại sau!")
                                            }
                                        }}

                                        className="flex items-center justify-center py-2 px-3 cursor-pointer
                                border border-transparent rounded-md text-sm font-medium 
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-indigo-500 transition whitespace-nowrap"
                                        title="Thêm cột mốc mới"
                                    >Cập nhật
                                    </button>
                                </div>
                            </div>

                            <div className="absolute top-1 right-12 flex space-x-1">
                                <button
                                    onClick={() => handleMoveItem(item.id, index, 'up')}
                                    disabled={index === 0}
                                    className={`cursor-pointer p-1 rounded-full transition ${index === 0 ? 'text-gray-300' : 'text-indigo-600 hover:bg-indigo-100'}`}
                                    title="Di chuyển lên"
                                >
                                    <MoveUp size={16} />
                                </button>
                                <button
                                    onClick={() => handleMoveItem(item.id, index, 'down')}
                                    disabled={index === storyTimeline.length - 1}
                                    className={`cursor-pointer p-1 rounded-full transition ${index === storyTimeline.length - 1 ? 'text-gray-300' : 'text-indigo-600 hover:bg-indigo-100'}`}
                                    title="Di chuyển xuống"
                                >
                                    <MoveDown size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SimpleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Thêm Cột Mốc Mới"
            >
                <div className="max-h-[80vh] overflow-y-auto p-1">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Tiêu đề (Ví dụ: Kỷ niệm 1 năm)"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            className="w-full border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <textarea
                            placeholder="Mô tả chi tiết..."
                            value={newItem.desc}
                            onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
                            className="w-full border p-2 rounded-md h-24 resize-none focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <label className="text-sm text-gray-600 block pt-2">🖼️ Ảnh đính kèm:</label>
                        <div className="flex items-center space-x-3">
                            {(newItem.image) && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={URL.createObjectURL(newItem.image as File)}
                                    alt="New Timeline Image Preview"
                                    className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-sm"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleNewItemImageChange}
                                className="text-sm text-gray-600 file:py-1 file:px-3 file:cursor-pointer file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            />
                        </div>

                        <CollapseSection size="small" title="Emojis" defaultOpen={false}>
                            <div className="flex flex-wrap max-h-48 overflow-y-auto p-1 border rounded-md">
                                {LOVE_TIMELINE_EMOJIS?.map((subItem, index) => (
                                    <div key={index} className="text-2xl cursor-pointer hover:scale-110 p-1" onClick={async () => {

                                        setNewItem({ ...newItem, desc: newItem.desc + subItem });

                                    }}>
                                        {subItem}
                                    </div>
                                ))}
                            </div>
                        </CollapseSection>
                        <button
                            onClick={handleAddItem}
                            className="w-full py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                        >
                            Thêm vào Timeline
                        </button>
                    </div>
                </div>
            </SimpleModal>
        </>
    )
}

export default memo(StoryTimeLine)

const SimpleModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className=" justify-between">
                    <div className="p-3 flex justify-between">
                        <h2 className="text-xl font-bold text-indigo-700">{title}</h2>
                        <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700 p-1 
                        rounded-full hover:bg-gray-100 transition">
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};