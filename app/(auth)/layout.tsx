import React from 'react';
import Image from "next/image";
const Layout = ({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) => {
	return (
		<div
		className="min-h-screen
		grid grid-cols-1 lg:grid-cols-2">
<div
		className="h-full lg:flex flex-col items-center justify-center px-4">
		{children}
	</div>
	<div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="Logo" />
      </div>
</div>
	);
}

export default Layout;
