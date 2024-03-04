import { AuthLayout } from "@/components/_layouts";
import { type PropsWithChildren } from "react";
import { AuthSlider } from "@/app/(auth)/_components/auth-slider";
export default function Layout({ children }: PropsWithChildren) {
    return (
        <AuthLayout>
            <AuthLayout.Form>
                { children }
            </AuthLayout.Form>
            <AuthLayout.Slider>
                <AuthSlider />
            </AuthLayout.Slider>
        </AuthLayout>
    );
}