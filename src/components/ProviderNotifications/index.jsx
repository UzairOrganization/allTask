'use client'

import { useState, useEffect } from 'react'
import { BellIcon, MessageSquare, Check } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import { API } from '@/lib/data-service'

export function NotificationDropdownForProvider() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)
    const router = useRouter()

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/notifications/provider`, { withCredentials: true })
            setNotifications(response.data.notifications)
            setUnreadCount(response.data.notifications.filter(n => !n.read).length)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id) => {
        try {
            const results = await axios.patch(`${API}/api/notifications/${id}`)
            setNotifications(notifications.map(n =>
                n._id === id ? { ...n, read: true } : n
            ))
            setUnreadCount(unreadCount - 1)
            router.push(`/chat/professional`)

        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const markAllAsRead = async () => {
        try {
            await axios.patch(`${API}/api/notifications/provider/markAllAsRead`, {}, { withCredentials: true })
            setNotifications(notifications.map(n => ({ ...n, read: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error('Error marking all notifications as read:', error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-700 text-white text-xs flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0 mt-4" align="end">
                <div className="px-4 py-3 border-b">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-green-700 text-sm hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                </div>

                <ScrollArea className="h-72">
                    {loading ? (
                        <div className="p-4 space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No notifications yet
                        </div>
                    ) : (
                        <div className="divide-y">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={(
                                        "p-3 hover:bg-gray-50 cursor-pointer transition-colors ",
                                        !notification.read && "bg-green-50"
                                    )}
                                    onClick={() => markAsRead(notification._id)}
                                >
                                    <div className="flex items-start gap-3 cursor-pointer">
                                        {notification.type === 'message' ? (
                                            <div className="p-2 rounded-full bg-green-100 text-green-700">
                                                <MessageSquare className="h-5 w-5" />
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded-full bg-gray-100 text-gray-700">
                                                <BellIcon className="h-5 w-5" />
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium">
                                                    {notification.type === 'message' && notification.metadata?.sender?.name
                                                        ? notification.metadata.sender.name
                                                        : 'System Notification'}
                                                </h4>
                                                {notification.read && (
                                                    <Check className="h-4 w-4 text-green-700" />
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(notification.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <div className="px-4 py-2 border-t text-center">
                    <button
                        onClick={fetchNotifications}
                        className="text-green-700 text-sm hover:underline"
                    >
                        Refresh notifications
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}