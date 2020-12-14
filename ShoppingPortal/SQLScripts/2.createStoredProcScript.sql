USE [ShoppingDB]
GO

/****** Object:  StoredProcedure [dbo].[uspGetAllProducts]    Script Date: 12/13/2020 11:54:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


 
CREATE procedure [dbo].[uspGetAllProducts]
as
BEGIN
SELECT * FROM dbo.tblProducts WITH (NOLOCK)
END


GO


USE [ShoppingDB]
GO

/****** Object:  StoredProcedure [dbo].[uspPlaceOrderIns]    Script Date: 12/13/2020 11:54:13 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[uspPlaceOrderIns] 
	@OrderId varchar(max)
	,@FirstName varchar(100)
	,@LastName varchar(100)
	,@Email varchar(100)
	,@Address varchar(100)
	,@Address2 varchar(100)
	,@Country varchar(100)
	,@State varchar(100)
	,@City varchar(100)
	,@Zip varchar(100)
	,@CardType varchar(50)
	,@NameOnCard varchar(100)
	,@CardNumber varchar(100)
	,@Expiration varchar(50)
	,@CVV varchar(100)


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[tblOrderDetails](
		[OrderId]
		,[ProcessedDate]
		,[FirstName]
		,[LastName]
		,[Email]
		,[Address]
		,[Address2]
		,[Country]
		,[State]
		,[City]
		,[Zip]
		,[CardType]
		,[NameOnCard]
		,[CardNumber]
		,[Expiration]
		,[CVV])
	
	VALUES(
		@OrderId
		,GetDate()
		,@FirstName
		,@LastName
		,@Email
		,@Address
		,@Address2
		,@Country
		,@State
		,@City
		,@Zip
		,@CardType
		,@NameOnCard
		,@CardNumber
		,@Expiration
		,@CVV
	)

END
GO


USE [ShoppingDB]
GO

/****** Object:  StoredProcedure [dbo].[uspSaveProductsOrderedIns]    Script Date: 12/13/2020 11:54:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[uspSaveProductsOrderedIns] 
	
	@OrderId varchar(MAX)
	,@ProductId bigint
	,@ProductName varchar(MAX)
	,@Price bigint
	,@Quantity int
	,@TotalPrice bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[tblProductsOrdered](
		[OrderId]
	,[ProductId]
	,[ProductName]
	,[Price]
	,[Quantity]
	,[TotalPrice]
	)
	
	VALUES(
		@OrderId
	,@ProductId
	,@ProductName
	,@Price
	,@Quantity
	,@TotalPrice
	)

END
GO



