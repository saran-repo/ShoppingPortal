create database ShoppingDB

USE [ShoppingDB]
GO

/****** Object:  Table [dbo].[Products]    Script Date: 12/13/2020 11:47:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblProducts](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [varchar](100) NOT NULL,
	[Price] [int] NOT NULL,
	[ImageName] [varchar](100) NOT NULL,
	[Description] [varchar](max) NOT NULL,
 CONSTRAINT [PK_ItemDetails] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


USE [ShoppingDB]
GO

/****** Object:  Table [dbo].[tblOrderDetails]    Script Date: 12/13/2020 11:48:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblOrderDetails](
	[OrderId] [varchar](max) NOT NULL,
	[ProcessedDate] [datetime] NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[Address] [varchar](100) NULL,
	[Address2] [varchar](100) NULL,
	[Country] [varchar](100) NULL,
	[State] [varchar](100) NULL,
	[City] [varchar](100) NULL,
	[Zip] [varchar](100) NULL,
	[CardType] [varchar](50) NULL,
	[NameOnCard] [varchar](100) NULL,
	[CardNumber] [varchar](100) NULL,
	[Expiration] [varchar](50) NULL,
	[CVV] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

USE [ShoppingDB]
GO

/****** Object:  Table [dbo].[tblProductsOrdered]    Script Date: 12/13/2020 11:48:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblProductsOrdered](
	[OrderId] [nvarchar](max) NOT NULL,
	[ProductId] [bigint] NULL,
	[ProductName] [varchar](max) NULL,
	[Price] [bigint] NULL,
	[Quantity] [int] NULL,
	[TotalPrice] [bigint] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO




