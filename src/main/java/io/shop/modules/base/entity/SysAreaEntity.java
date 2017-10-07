package io.shop.modules.base.entity;

import io.shop.common.utils.CommonUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 行政区划
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
public class SysAreaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//区域id
	private Long areaId;
	//行政区划代码
	private String areaCode;
	//父级id
	private String parentCode;
	/**
	 * 父级名称
	 */
	private String parentName;
	//地区名称
	private String name;
	//层级
	private Integer layer;
	//排序号,1:省级,2:地市,3:区县
	private Integer orderNum;
	//显示,1:显示,0:隐藏
	private Integer status;
	//备注
	private String remark;
	//创建时间
	private Date createDate;
	//修改时间
	private Date updateDate;
	/**
	 * ztree属性
	 */
	private Boolean open;

	private Boolean isParent;

	private Integer size;

	private List<?> list;
	/**
	 * 设置：区域id
	 */
	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}
	/**
	 * 获取：区域id
	 */
	public Long getAreaId() {
		return areaId;
	}
	/**
	 * 设置：行政区划代码
	 */
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	/**
	 * 获取：行政区划代码
	 */
	public String getAreaCode() {
		return areaCode;
	}
	/**
	 * 设置：父级id
	 */
	public void setParentCode(String parentCode) {
		this.parentCode = parentCode;
	}
	/**
	 * 获取：父级id
	 */
	public String getParentCode() {
		return parentCode;
	}


	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * 设置：地区名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：地区名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：层级
	 */
	public void setLayer(Integer layer) {
		this.layer = layer;
	}
	/**
	 * 获取：层级
	 */
	public Integer getLayer() {
		return layer;
	}
	/**
	 * 设置：排序号,1:省级,2:地市,3:区县
	 */
	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}
	/**
	 * 获取：排序号,1:省级,2:地市,3:区县
	 */
	public Integer getOrderNum() {
		return orderNum;
	}
	/**
	 * 设置：显示,1:显示,0:隐藏
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：显示,1:显示,0:隐藏
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：备注
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateDate() {
		return createDate;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateDate() {
		return updateDate;
	}


	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getIsParent() {
		return isParent;
	}

	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	public void checkParent() {
		if(CommonUtils.isIntThanZero(this.size)) {
			this.isParent = true;
		} else {
			this.isParent = false;
		}
	}

	public void checkParentName() {
		if(this.parentCode.equals("0")) {
			this.parentName = "省级区域";
		}
	}

}
